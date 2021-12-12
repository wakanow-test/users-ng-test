import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  template: `
    <div class="container">
      <div class="user-card">
        <div class="user-bckg">
          <img src="{{ user?.avatar }}" alt="User picture" />
        </div>

        <div class="user-detials">
          <h2 *ngIf="!editMode">
            {{ user?.first_name }} {{ user?.last_name }}
          </h2>
          <div class="name-editmode" *ngIf="editMode">
            <h2
              id="first_name"
              class="editmode mg-r-7"
              [contentEditable]="true"
            >
              {{ user?.first_name }}
            </h2>
            {{ ' ' }}
            <h2 id="last_name" class="editmode" [contentEditable]="true">
              {{ user?.last_name }}
            </h2>
          </div>
          <p
            class="editmode user-email"
            *ngIf="editMode"
            [contentEditable]="true"
            id="email"
          >
            {{ user?.email }}
          </p>
          <p *ngIf="!editMode" class="user-email">
            {{ user?.email }}
          </p>
        </div>
        <div class="edit-details">
          <button
            *ngIf="editMode == false"
            class="btn btn-primary"
            (click)="setEditMode()"
          >
            Edit
          </button>
          <button
            *ngIf="editMode == false"
            class="btn btn-primary"
            (click)="deleteUser()"
          >
            Delete
          </button>
          <button *ngIf="editMode" class="btn btn-primary" (click)="editUser()">
            Save
          </button>
          <button
            *ngIf="editMode"
            class="btn btn-primary"
            (click)="setEditMode()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
      }

      .user-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        width: 500px;
        height: 500px;
        border-radius: 3px;
        background-color: white;
        margin: 10px;
        box-shadow: 0px 1px 2px 0px rgb(179 173 173 / 75%);
        cursor: pointer;
      }

      img {
        border-radius: 50%;
        border: 3px solid #3f51b5;
        position: relative;
        top: 129px;
        left: 38%;
      }

      .user-bckg {
        width: 100%;
        height: 200px;
        background-image: url('https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');
        position: relative;
      }

      .user-detials {
        margin-top: 50px;
      }

      .user-card p {
        margin: 0;
      }

      .user-card h2 {
        margin-bottom: 2px;
      }

      .user-email {
        color: lightgray;
        font-weight: 700;
      }

      .edit-details {
        margin-top: 20px;
      }
      .edit-details button {
        background-color: unset;
        border: none;
        color: #3f51b5;
        padding: 3px 7px;
      }

      .name-editmode {
        display: flex;
      }

      .editmode {
        border-bottom: 1px solid black;
        padding-bottom: 2px;
        outline: none;
      }

      .mg-r-7 {
        margin-right: 7px;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  public user: any;
  public editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.userService.getUser(id).subscribe((user) => {
        this.user = user;
      });
    });
  }

  setEditMode() {
    this.editMode = !this.editMode;
  }

  editUser() {
    this.userService
      .editUser(this.user?.id, {
        first_name: document.getElementById('first_name')?.innerText || '',
        last_name: document.getElementById('last_name')?.innerText || '',
        email: document.getElementById('email')?.innerText || '',
        id: this.user?.id,
        avatar: this.user?.avatar,
      })
      .subscribe((user) => {
        this.user = user;
        this.setEditMode();
      });
  }

  deleteUser() {
    if (confirm('Do you want to delete this user?')) {
      this.userService.deleteUser(this.user?.id);
      this.router.navigate(['/users']);
    }
  }
}
