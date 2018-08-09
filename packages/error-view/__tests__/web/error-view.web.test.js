import { addSerializers, minimalRnw } from "@times-components/jest-serializer";
import shared from "../shared";

addSerializers(expect, minimalRnw());

shared();
