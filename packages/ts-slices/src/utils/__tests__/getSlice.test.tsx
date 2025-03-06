import { getSliceComponent } from '../getSlice';
import Lead1 from '../../components/slices/Lead1/Lead1';
import Lead1And1 from '../../components/slices/Lead1And1/Lead1And1';
import Lead1And2 from '../../components/slices/Lead1And2/Lead1And2';
import Lead1And3Reversed from '../../components/slices/Lead1And3Reversed/Lead1And3Reversed';
import Lead2 from '../../components/slices/Lead2/Lead2';
import Secondary2And2 from '../../components/slices/Secondary2And2/Secondary2And2';
import Secondary2And3 from '../../components/slices/Secondary2And3/Secondary2And3';
import Secondary2And3NoPic from '../../components/slices/Secondary2And3NoPic/Secondary2And3NoPic';
import Secondary3 from '../../components/slices/Secondary3/Secondary3';
import Secondary4 from '../../components/slices/Secondary4/Secondary4';
import Secondary4Odd from '../../components/slices/Secondary4Odd/Secondary4Odd';
import Secondary10 from '../../components/slices/Secondary10/Secondary10';
import RelatedArticle1 from '../../components/slices/RelatedArticle1/RelatedArticle1';

describe('getSlice()', () => {
  it('should render null when not able to find slice', () => {
    expect(getSliceComponent('RELATED_ARTICLE_1000')).not.toBe;
  });

  it('should render RelatedArticle1 when it is called', () => {
    expect(getSliceComponent('RELATED_ARTICLE_1')).toEqual(RelatedArticle1);
  });
  it('should render Secondary4Odd when it is called', () => {
    expect(getSliceComponent('SECONDARY_4_ODD')).toEqual(Secondary4Odd);
  });
  it('should render Secondary10 when it is called', () => {
    expect(getSliceComponent('SECONDARY_10')).toEqual(Secondary10);
  });
  it('should render Secondary4 when it is called', () => {
    expect(getSliceComponent('SECONDARY_4')).toEqual(Secondary4);
  });
  it('should render Secondary3 when it is called', () => {
    expect(getSliceComponent('SECONDARY_3')).toEqual(Secondary3);
  });
  it('should render Secondary2And3NoPic when it is called', () => {
    expect(getSliceComponent('SECONDARY_2_AND_3_NO_PIC')).toEqual(
      Secondary2And3NoPic
    );
  });
  it('should render Secondary2And3 when it is called', () => {
    expect(getSliceComponent('SECONDARY_2_AND_3')).toEqual(Secondary2And3);
  });
  it('should render Secondary2And2 when it is called', () => {
    expect(getSliceComponent('SECONDARY_2_AND_2')).toEqual(Secondary2And2);
  });

  it('should render Lead2 when it is called', () => {
    expect(getSliceComponent('LEAD_2')).toEqual(Lead2);
  });

  it('should render Lead1And3Reversed when it is called', () => {
    expect(getSliceComponent('LEAD_1_AND_3_REVERSED')).toEqual(
      Lead1And3Reversed
    );
  });

  it('should render Lead1And2 when it is called', () => {
    expect(getSliceComponent('LEAD_1_AND_2_COLUMNIST')).toEqual(Lead1And2);
  });

  it('should render Lead1 when it is called', () => {
    expect(getSliceComponent('LEAD_1')).toEqual(Lead1);
  });

  it('should render Lead1And1 when it is called', () => {
    expect(getSliceComponent('LEAD_1_AND_1_COMPONENT')).toEqual(Lead1And1);
  });
});
