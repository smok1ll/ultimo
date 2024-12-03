import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { BookVolume } from '../../models/book.model';
import { Network } from '@ngx-pwa/offline';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.page.html',
  styleUrls: ['./libro.page.scss'],
})
export class LibroPage implements OnInit {
  isLoading: boolean = false;
  allSavedBooks: BookVolume[] = [];
  online$: Observable<boolean>;

  constructor(private booksService: BooksService, private network: Network) {
    this.online$ = this.network.onlineChanges;
  }

  ngOnInit() {
    this.isLoading = true;
  }


  async ionViewWillEnter() {
    await this.booksService.configurePreferences('library');
    await this.getAllSavedBooks();
    this.isLoading = false;
  }

  sendData(bookId?: string) {
    if (bookId)
      this.booksService.bookId = bookId;
  }

  async getAllSavedBooks() {
    this.allSavedBooks = [];
    const allKeys = await this.booksService.getAllKeys();

    // load all stored books
    for (const key of allKeys) {
      const value: BookVolume = await this.booksService.getBook(key, true);
      if (value)
        this.allSavedBooks.push(value);
    }
  }

  async removeFromLibrary(bookId?: string) {
    if (bookId) {
      this.booksService.removeBook(bookId);
    }

    await this.getAllSavedBooks();
  }

  async removeAllFromLibrary() {
    await this.booksService.clearAllBooks();
    await this.getAllSavedBooks();
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Yes',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.removeAllFromLibrary();
      },
    },
  ];
  
}
