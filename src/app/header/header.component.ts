import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h3>Users</h3>
      <ul>
        <li><a routerLink="/users">Users</a></li>
        <li><a routerLink="/signup">Sign Up</a></li>
      </ul>
    </header>
  `,
  styles: [
    `
      header {
        background-color: black;
        color: white;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      ul {
        list-style-type: none;
        display: flex;
        margin: 0;
        padding: 0;
      }

      h3 {
        margin: 3px initial;
        padding: 3px initial;
      }

      li {
        margin-right: 20px;
      }
      a {
        color: white;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
