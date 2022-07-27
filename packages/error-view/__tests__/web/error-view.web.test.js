import { addSerializers } from "@times-components/jest-serializer";
import shared from "../shared";

addSerializers(expect);

shared();
