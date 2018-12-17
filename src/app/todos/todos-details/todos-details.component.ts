import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Todos} from '../../models/todos.model';
import {TodoService} from '../todo.service';
import {NgForm} from '@angular/forms';
import {ToDoUpdate} from '../../models/toDoUpdate.model';
import {ApplicationUserService} from './application-user.service';
import {ApplicationUser} from '../../models/application-user.model';
import {activateRoutes} from '@angular/router/src/operators/activate_routes';

@Component({
  selector: 'app-todos-details',
  templateUrl: './todos-details.component.html',
  styleUrls: ['./todos-details.component.css']

})
export class TodosDetailsComponent implements OnInit {

  @ViewChild('textForm') textForm: NgForm;
  id: number;
  todoCard: Todos;
  users: ApplicationUser[];
  clicked: boolean;
  values = '';

  constructor(private router: Router, private route: ActivatedRoute, private todService: TodoService, private service: TodoService,
              private userService: ApplicationUserService) {


  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.todService.getCardById(this.id).then(resp =>
            this.todoCard = resp
          );
        }
      );

    this.clicked = false;

  }

  submitText() {


    if (this.clicked) {
      this.todoCard.text = this.textForm.value.text;

      this.todoCard.state = 'UPDATED';

      this.service.updateToDo(new ToDoUpdate(this.todoCard))
        .subscribe(
        x => this.todoCard = x
      );
    }

  }

  searchUsers(event: any) {
    this.values = event.target.value;

    if (this.values.length > 2) {
      this.userService.getAllPersonByName(this.values).subscribe(
      resp => {
        this.users = resp;
      }
    );
    }
  }

  selectedUser(id: number) {
    this.todService.moveCardToOtherUser(this.todoCard.id, this.users[id].id);
    this.todService.addToDoCardtoShare(this.todoCard);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}


