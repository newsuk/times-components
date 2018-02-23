import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import { SliceContainer } from "../shared.responsive";
import {
  getContainer,
  getLeadContainer,
  getChildContainer,
  ChildrenContainer,
  Separator
} from "./responsive";

const LeadSlice = ({ lead, child1, child2 }) => {
  const hasChildren = child1();
  const hasTwoChildren = child2();
  const Container = getContainer({ hasChildren: !!hasChildren });
  Container.displayName = "Container";
  const LeadContainer = getLeadContainer({ hasChildren: !!hasChildren });
  LeadContainer.displayName = "LeadContainer";
  const ChildContainer1 = getChildContainer({
    isSecondChild: false,
    hasTwoChildren: !!hasTwoChildren
  });
  ChildContainer1.displayName = "ChildContainer1";
  const ChildContainer2 = getChildContainer({ isSecondChild: true });
  ChildContainer2.displayName = "ChildContainer2";
  return (
    <SliceContainer>
      <Container>
        <LeadContainer>{lead()}</LeadContainer>
        {hasChildren ? <Separator /> : null}
        {hasChildren ? (
          <ChildrenContainer>
            <ChildContainer1>{child1()}</ChildContainer1>
            {hasTwoChildren ? (
              <ChildContainer2>{child2()}</ChildContainer2>
            ) : null}
          </ChildrenContainer>
        ) : null}
      </Container>
    </SliceContainer>
  );
};

LeadSlice.propTypes = propTypes;
LeadSlice.defaultProps = defaultProps;

export default LeadSlice;
