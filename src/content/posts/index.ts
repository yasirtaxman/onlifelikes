import type { Post } from "@/lib/types";

import { post as spaceSaving } from "./best-space-saving-products-for-small-apartments";
import { post as smartHomeBeginners } from "./best-smart-home-devices-for-beginners";
import { post as kitchenGadgets50 } from "./best-kitchen-gadgets-under-50";
import { post as cordlessVacuums } from "./best-cordless-vacuums-for-apartments";
import { post as deskLamps } from "./best-desk-lamps-for-home-office";
import { post as robotVacuumsPets } from "./best-robot-vacuums-for-pet-hair";
import { post as apartmentBigger } from "./how-to-make-a-small-apartment-feel-bigger";
import { post as cleanLessEffort } from "./how-to-keep-your-home-clean-with-less-effort";
import { post as robotVsCordless } from "./robot-vacuum-vs-cordless-vacuum";
import { post as compactCoffee } from "./best-compact-coffee-makers-for-small-kitchens";
import { post as underSink } from "./best-under-sink-organizers";
import { post as petCameras } from "./best-pet-cameras-for-dogs-and-cats";

/** All local sample posts. Once Sanity is connected, CMS content takes over. */
export const localPosts: Post[] = [
  spaceSaving,
  smartHomeBeginners,
  kitchenGadgets50,
  cordlessVacuums,
  deskLamps,
  robotVacuumsPets,
  apartmentBigger,
  cleanLessEffort,
  robotVsCordless,
  compactCoffee,
  underSink,
  petCameras,
];
