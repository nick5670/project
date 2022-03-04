import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from './model/room';
import { User } from './model/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getRooms(): Observable<Array<Room>>
  {
    return this.http.get<Array<Room>>(environment.apiUrl +'/rooms')
    .pipe(
      map( data => 
        {
          const rooms = new Array<Room>();
          for(const room of data)
          {
            rooms.push(Room.fromHttp(room));
          }
          return rooms;
      })
    );
  }

  getUsers(): Observable<Array<User>>
  {
    return this.http.get<Array<User>>(environment.apiUrl +"/users")
    .pipe(
      map( data => 
        {
          const users = new Array<User>();
          for(const u of data)
          {
            users.push(User.fromHttp(u));
          }
          return users;
      })
    );
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(environment.apiUrl + '/users/' + id)
  }

  updateRoomBooking(room: Room) : Observable<Room>
  {
     return this.http.put<Room>(environment.apiUrl + '/rooms/' + room.id, room );
  }


  addUser(user: User): Observable<User>
  {
    return this.http.post<User>(environment.apiUrl + '/users', user);
  }

  addRoom(room: Room): Observable<Room>
  {
    return this.http.post<Room>(environment.apiUrl + '/rooms', room);
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(environment.apiUrl + '/users/'+ user.id, user);
  }

  deleteUser(id: number){
    return this.http.delete(environment.apiUrl + '/users/' + id);
  }

  deleteRoom(id: number){
    return this.http.delete(environment.apiUrl + '/rooms/' + id);
  }


  constructor(private http: HttpClient) {

  }
}
