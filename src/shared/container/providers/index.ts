import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider()
);
