import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TableService } from '../services/table.service';
import { Table } from '../interfaces/table';
import { WaitingListService } from '../services/waiting-list.service';
import { User } from '../interfaces/user';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-maitre',
  templateUrl: './home-maitre.page.html',
  styleUrls: ['./home-maitre.page.scss'],
})
export class HomeMaitrePage implements OnInit {

  public userData: any = "";
  private sub: any;
  public selectedOption: string[] = [];
  public showToast: boolean = false;
  public tables: Table[] = [];
  public userClients: User[] = [];
  customActionSheetOptions = {
    header: 'Mesas',
    subHeader: 'Seleccione una de las mesas libres:',
  };

  constructor(private auth: AuthService, public tableService: TableService, public waitingService: WaitingListService, private loadingCtrl: LoadingController, public user: UserService) { }

  ngOnInit() {
    this.sub = this.auth.getUserLogged().subscribe((auth) => {
      this.userData = auth?.email;
    });
    this.waitingService.getList(this.userClients);
    this.tableService.getFreeTables(this.tables);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async assignTable(tableNumber: string, userId: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000,
    });
    await loading.present();
    setTimeout(() => {
      if (tableNumber == undefined) {
        this.setOpen(true);
      }
      else {
        this.tableService.updateTable(tableNumber, "ocupada", userId);
        this.user.updateUserStateById(userId, `${tableNumber} mesa asignada`);
        this.waitingService.deleteUser(userId);
        this.userClients = [];
        this.tables = [];
        this.selectedOption = [];
        this.waitingService.getList(this.userClients);
        this.tableService.getFreeTables(this.tables);
      }
    }, 2000);
  }

  setOpen(isOpen: boolean) {
    this.showToast = isOpen;
  }

  logOut() {
    this.showLoading()
    setTimeout(() => {
      this.auth.logout();
    }, 2000);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      duration: 2000,
    });

    loading.present();
  }
}
