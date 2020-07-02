import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class UserService{
    BASE_URL:string = 'http://localhost:4000';
    constructor(
        private http: HttpClient){ }

    addUser(user: User): Observable<User> {
        var url: string = this.BASE_URL+'/api/createuser';
        return this.http.post<User>(url, user, httpOptions)
            .pipe(
                tap((retorno: User)=> 
                    this.log("User Add"),
                ),
                catchError(  
                    this.handleError<User>('add')
                )
        );
    }

    editUser(user: User): Observable<User> {
        var url: string = this.BASE_URL+'/api/edituser';
        return this.http.put<User>(url, user, httpOptions)
            .pipe(
                tap((retorno: User)=> 
                    this.log("User Add"),
                ),
                catchError(  
                    this.handleError<User>('addHero')
                )
        );
    }
    /**  requisição GET para nossa api   */
    getUsers (): Observable<User[]> {
        // definição da nassa url 
        var url: string = this.BASE_URL+'/api/getAllUsers';
        //no caso ele vai retornar uma lista de Users
        return this.http.get<User[]>(url)
        .pipe(
            // apenas imprime no console que a requisição foi realizada com sucesso 
            tap(todos => this.log('listando usuários')),
            //faz o tratamento de erro
            catchError(this.handleError('getUsers', []))
        );
    }

   
  /** DELETE: delete user */
  deleteUser (user: User | number): Observable<User> {
    //pega o Id do usuário 
    const id = typeof user === 'number' ? user : user._id;
    // monta a url
    var url: string = this.BASE_URL+'/api/deleteuser/'+id;
    console.log(url);
    //executa um http delete para enviar um Http Delete para o servidor
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteuser'))
    );
  }
        
   
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
    private log(message: string) {
        console.log(`HeroService: ${message}`);
    }    
}