import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostPayload } from './add-post/post-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddPostService {
  constructor(private httpClient: HttpClient) {}

  addPost(postPayload: PostPayload) {
    return this.httpClient.post(
      'https://sejal-blog-nty64gobktbm.runkit.sh/post/blog',
      postPayload
    );
  }

  delPost(id: any) {
    return this.httpClient.delete(
      'https://sejal-blog-nty64gobktbm.runkit.sh/delete/blog?id=' + id
    );
  }

  getAllPosts(username: String): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>(
      'https://sejal-blog-nty64gobktbm.runkit.sh/get/myBlogs?email=' + username
    );
  }

  getPost(permaLink: Number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>(
      'https://sejal-blog-nty64gobktbm.runkit.sh/get/blog' + permaLink
    );
  }
}
