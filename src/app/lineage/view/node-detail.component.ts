import { Component } from '@angular/core';

@Component({
  selector: 'app-node-detail',
  template: `
    <nz-card
      style="width: 100%;"
      [nzLoading]="loading">
      <nz-card-meta [nzAvatar]="avatarTemplate" [nzTitle]="nodeTitle" nzDescription="This is the description"></nz-card-meta>
      <nz-collapse>
        <nz-collapse-panel  [nzHeader]="panel.name" [nzActive]="panel.active" [nzDisabled]="panel.disabled">
          <p style="margin:0;">A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
        </nz-collapse-panel>
      </nz-collapse>
    </nz-card>

    <ng-template #avatarTemplate>
      <nz-avatar nzSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
    </ng-template>
    <ng-template #actionSetting>
      <i class="anticon anticon-setting"></i>
    </ng-template>
    <ng-template #actionEdit>
      <i class="anticon anticon-edit"></i>
    </ng-template>
    <ng-template #actionEllipsis>
      <i class="anticon anticon-ellipsis"></i>
    </ng-template>
  `
})
export class NodeDetailComponent {
  loading = false;
  nodeTitle = "Node1"
  panel = {
    name:"test",
    active:"false",
    disabled: "false"
  }
}
