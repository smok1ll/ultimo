import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioPageRoutingModule } from './inicio-routing.module';
import { InicioPage } from './inicio.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { SearchOptionsModalComponent } from './search-options-modal/search-options-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    ExploreContainerComponentModule
  ],
  declarations: [InicioPage, SearchOptionsModalComponent]
})
export class InicioPageModule {}
