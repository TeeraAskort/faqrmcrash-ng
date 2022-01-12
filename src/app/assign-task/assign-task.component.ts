import { RestService } from 'src/app/services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.sass'],
})
export class AssignTaskComponent implements OnInit {
  private workerIndex: number = -1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) {
    let index: string | null =
      this.activatedRoute.snapshot.paramMap.get('index');
    if (index) {
      this.workerIndex = parseInt(index);
    }
  }

  ngOnInit(): void {}
}
