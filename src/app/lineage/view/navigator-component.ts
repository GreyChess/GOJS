import {Component, TemplateRef, ViewChild} from '@angular/core';
import {OnInit} from '@angular/core';
import {GoDiagramUtils} from '../goUtils/GoDiagramUtils';
import {GoJSDiagram} from '../goUtils/IGoJDDiagram';
import * as go from 'gojs';
import {NodeTemplates} from '../goUtils/NodeTemplates';
import {DEMONODES} from '../mockData/mock-node-data';
import {LinkTemplates} from '../goUtils/LinkTemplates';

@Component({
  selector: 'nz-demo-layout-custom-trigger',
  template: `
    <nz-layout>
      <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed" [nzTrigger]="triggerTemplate" id="sider">
        <div class="logo">
        </div>
        <ul nz-menu [nzTheme]="'dark'" [nzMode]="'inline'" [nzInlineCollapsed]="isCollapsed">
          <li nz-submenu>
            <span title><i class="anticon anticon-user"></i><span class="nav-text">User</span></span>
            <ul>
              <li nz-menu-item>Tom</li>
              <li nz-menu-item>Bill</li>
              <li nz-menu-item>Alex</li>
            </ul>
          </li>
          <li nz-submenu>
            <span title><i class="anticon anticon-team"></i><span class="nav-text">Team</span></span>
            <app-node-detail></app-node-detail>
            <ul>
              <li nz-menu-item>Team 1</li>
              <li nz-menu-item>Team 2</li>
            </ul>
          </li>
          <li nz-menu-item><span><i class="anticon anticon-file"></i><span class="nav-text">File</span></span></li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header style="background: #fff; padding:0;">
          <i class="anticon trigger" [class.anticon-menu-fold]="!isCollapsed" [class.anticon-menu-unfold]="isCollapsed"
             (click)="isCollapsed=!isCollapsed"></i>
        </nz-header>
        <nz-content style="display:flex; flex-direction: column;">
          <nz-breadcrumb style="margin:16px 0;">
            <nz-breadcrumb-item>User</nz-breadcrumb-item>
            <nz-breadcrumb-item>Bill</nz-breadcrumb-item>
          </nz-breadcrumb>
          <div style="padding:24px; background: #fff; min-height: 360px;" id="goDiagramDiv">
            Bill is a cat.
          </div>
        </nz-content>
        <nz-footer style="text-align: center;">Ant Design ©2017 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
    <ng-template #trigger>
      <i class="anticon anticon-up"></i>
    </ng-template>
  `,
  styles: [
      `
      :host ::ng-deep .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
      }

      :host ::ng-deep .trigger:hover {
        color: #1890ff;
      }

      :host ::ng-deep .logo {
        height: 32px;
        background: rgba(255, 255, 255, .2);
        margin: 16px;
      }

      nz-layout {
        height: 100%;
      }
      
      #sider {
        max-width: 350px !important;
        min-width: 200px !important;
        width: 20rem !important;
        flex: none !important;
      }
      
      #goDiagramDiv {
        flex: auto;
      }
    `
  ]
})
export class NzDemoLayoutCustomTriggerComponent implements OnInit {
  isCollapsed = false;
  triggerTemplate = null;
  goDiagram: GoJSDiagram;
  demoNodeArray = DEMONODES;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  ngOnInit(): void {
    this.goDiagram = GoDiagramUtils.createDiagram('goDiagramDiv');
    this.goDiagram.model = new go.GraphLinksModel(this.demoNodeArray,
      [{from: '1', to: '2', type: 'contains'}]);
    this.goDiagram.nodeTemplateMap = new NodeTemplates().getNodeTemplateMap();
    this.goDiagram.linkTemplate = new LinkTemplates().getLinkTempLate();
  }


}
