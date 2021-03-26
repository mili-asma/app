import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  
  constructor(public userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.getUserList().subscribe((data: User[])=>{
      this.users = data;
      console.log(this.users);
    })  
  }
  
  deleteUser(id){
    this.userService.deleteUser(id).subscribe(res => {
         this.users = this.users.filter(item => item.id !== id);
         console.log('user deleted successfully!');
    })
  }

}
