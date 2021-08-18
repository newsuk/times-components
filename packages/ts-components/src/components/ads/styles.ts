import styled from 'styled-components';

export const HeaderAdContainer = styled.div<{ height?: number }>`
	display: flex;
	justify-content: center;
	height: calc(${({ height }) => (height ? height : 90)}px + 24px);
	padding: 12px 0;
	overflow: hidden;
`;
