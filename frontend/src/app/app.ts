import { Component } from '@angular/core';
import { ModuleListComponent } from './components/module-list/module-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ModuleListComponent],
  template: `<app-module-list />`,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class App { }
