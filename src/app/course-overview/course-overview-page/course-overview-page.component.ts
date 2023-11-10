import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/common/services/graph.service';

@Component({
  selector: 'app-course-overview-page',
  templateUrl: './course-overview-page.component.html',
  styleUrls: ['./course-overview-page.component.scss']
})
export class CourseOverviewPageComponent implements OnInit {
  
  studyGraphFolders?: {
    id: string;
    name: string;
    webUrl: string;
    driveId: string;
    userDisplayName: string;
  }[];

  constructor(private graphService: GraphService) { }

  async ngOnInit() {
    const sharedFoldersResponse = await this.graphService.client?.api('/me/drive/sharedWithMe?$select=remoteItem,id,name').get();
    this.studyGraphFolders = sharedFoldersResponse?.value
      .filter((sharedItem: any) => !!sharedItem.remoteItem.folder && sharedItem.name.startsWith('StudyGraph_'))
      .map((sharedItem: any) => ({
        id: sharedItem.id,
        name: sharedItem.name,
        webUrl: sharedItem.remoteItem.webUrl,
        driveId: sharedItem.remoteItem.parentReference.driveId,
        userDisplayName: sharedItem.remoteItem.shared.owner.user.displayName
      })) ?? [];
  }
}
