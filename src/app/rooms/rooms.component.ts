import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { DataService } from '../data.service';
import { Room } from '../model/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms!: Array<Room>;

  selectedRoom!: Room;
  action!: string;
  faSquare= faSquare;

  constructor(private service: DataService, private router: Router,
              private route: ActivatedRoute, private datePipe: DatePipe) { }



  loadData()
  {
    let current = new Date;
    this.service.getRooms().subscribe(
      next =>{
        this.rooms= next;
        this.route.queryParams.subscribe(

          (params) =>{
            const id = params['id'];
            this.action = params['action'];
            if(id)
            {
              this.selectedRoom = this.rooms.find(room =>room.id === +id)!
            }
          }
        )
      }
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  getSelectedRoom(id: number)
  {
    this.router.navigate(['rooms'], {queryParams: {action: 'view',id: id}});
  }

}
