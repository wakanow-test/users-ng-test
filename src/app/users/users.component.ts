import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Users } from '../types';

@Component({
  selector: 'app-users',
  template: `
    <div class="user-container">
      <a
        *ngFor="let user of users"
        class="user-card"
        href="{{ '/users/' + user?.id }}"
      >
        <img src="{{ user?.avatar }}" />
        <p class="user-name">
          <span>{{ user?.first_name }} {{ user?.last_name }}</span>
        </p>
        <p class="user-email">
          <span>{{ user?.email }}</span>
        </p>
      </a>
    </div>
  `,
  styles: [
    `
      .user-container {
        display: flex;
        flex-wrap: wrap;
      }

      @media screen and (max-width: 900px) and (min-width: 300px) {
        .user-container {
          width: 100%;
        }

        .user-card {
          width: 100% !important;
        }
      }

      .user-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 200px;
        border-radius: 3px;
        background-color: white;
        margin: 10px;
        box-shadow: 0px 1px 2px 0px rgb(179 173 173 / 75%);
        cursor: pointer;
      }

      .user-card p {
        margin: 0;
      }

      .user-card .user-name {
        margin: 5px 0;
        font-size: 1.1rem;
        font-weight: 800;
      }

      .user-card .user-email {
        font-size: 0.9rem;
        color: lightgray;
        margin-bottom: 5px;
      }
    `,
  ],
})
export class UsersComponent implements OnInit {
  public users: Users = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: Users) => {
      this.users = data?.reverse();
    });
  }
}
