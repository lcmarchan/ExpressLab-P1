import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { NgForm } from "@angular/forms"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  cartItems: any[];
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  itemToEdit: any;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart
      .getRequest()
      .subscribe(response => {this.cartItems = response});
  }

  setItemToEdit(item): void {
    this.itemToEdit = item;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  handlePost(addForm: NgForm): void {
    this.cart.postRequest(addForm.value).subscribe(response => {this.cartItems = response;});
    this.toggleAddForm();
  }

  handlePut(editForm: NgForm, id: number): void {
    this.cart.putRequest(editForm.value, id).subscribe(response => {this.cartItems = response;});
    this.toggleEditForm();
  }

  handleDelete(id: number): void {
    this.cart.deleteRequest(id).subscribe(response => {this.cartItems = response;});
  }
}
