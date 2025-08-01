import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { BudgetPlannerRoutingModule } from "./budget-planner-routing.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, BudgetPlannerRoutingModule, HttpClientModule],
})
export class BudgetPlannerModule {}
