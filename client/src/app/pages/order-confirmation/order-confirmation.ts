import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ RouterLink ],
  selector: 'app-order-confirmation',
  styleUrl: './order-confirmation.css',
  templateUrl: './order-confirmation.html',
})
export class OrderConfirmation {}
