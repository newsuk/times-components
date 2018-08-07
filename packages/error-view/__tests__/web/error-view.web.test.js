import { addSerializers, rnw } from "@times-components/jest-serializer";
import shared from "../shared";

addSerializers(expect, rnw());

shared();
