// app/home/home-view-model.ts

// Update this 👇
import {
  Frame,
  Observable,
  ObservableArray,
  ItemEventData,
  WebView,
  EventData,
  Button,
  knownFolders,
  alert,
} from "@nativescript/core";
import { FlickModel } from "~/models/flick.model";
import { FlickService } from "~/services/flick.service";

export class HomeViewModel extends Observable {
  private _flicks: FlickModel[];

  constructor() {
    super();
    this.populateFlicks();
  }

  get flicks(): ObservableArray<FlickModel> {
    return new ObservableArray(this._flicks);
  }

  populateFlicks(): void {
    this._flicks = FlickService.getInstance().getFlicks();
  }

  onFlickTap(args: ItemEventData): void {
    Frame.topmost().navigate({
      moduleName: "details/details-page",
      context: { flickId: this._flicks[args.index].id },
    });
  }

  onBadError(): void {
    throw new Error("This is a bad error");
  }

  onRedirect(args: EventData): void {
    let webView = new WebView();
    webView.height = { value: 100, unit: "%" };
    webView.width = { value: 100, unit: "%" };
    const button = args.object as Button;
    webView.src = "~/assets/html/redirect.html";
    button.page.content = webView;
  }

  onRedirectExternal(args: EventData): void {
    let webView = new WebView();
    webView.height = { value: 100, unit: "%" };
    webView.width = { value: 100, unit: "%" };
    const button = args.object as Button;
    webView.src = "https://ui5.sap.com/";
    button.page.content = webView;
  }

  onIntensiveComputation(): void {
    const start = new Date().getTime();
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    const end = new Date().getTime();
    console.log(`Time consuming computation took ${end - start} ms`);
  }

  onInifinityLoop(): void {
    let i = 0;
    while (true) {
      console.log(i);
      i++;
    }
  }

  async onWriteFile(): Promise<void> {
    const documentsFolder = knownFolders.documents();
    const file = documentsFolder.getFile("test.txt");
    await file.writeText(
      "This file is created by CODE. This file could have been very large!!!"
    );
    alert("File written!");
  }

  async onReadFile(): Promise<void> {
    const documentsFolder = knownFolders.documents();
    const file = documentsFolder.getFile("test.txt");
    const content = await file.readText();
    alert(content);
  }
}
