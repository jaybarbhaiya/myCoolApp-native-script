// app/home/home-view-model.ts

// Update this 👇
import {
  Frame,
  Observable,
  ObservableArray,
  ItemEventData,
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

  // Add this 👇
  onFlickTap(args: ItemEventData): void {
    Frame.topmost().navigate({
      moduleName: "details/details-page",
      context: { flickId: this._flicks[args.index].id },
    });
  }
}
