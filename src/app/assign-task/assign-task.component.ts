import { RestService } from 'src/app/services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.interface';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.sass'],
})
export class AssignTaskComponent implements OnInit {
  private workerIndex: number = -1;

  public tasks: Task[] | undefined = undefined;

  public error: string | undefined = undefined;

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

    this.restService.getAllTasks().subscribe((data) => {
      if (data) {
        this.tasks = data;
      }
    });
  }

  ngOnInit(): void {}

  public assignTask(id: Number) {
    this.restService.assignTask(id, this.workerIndex).subscribe(
      (data) => {
        if (data) {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.error = error.error;
      }
    );
  }
}
