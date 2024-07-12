import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { styled } from 'styled-components';

type BarChartProps = {
  value: number;
  min: number;
  max: number;
};

const TransverseGraph: React.FC<BarChartProps> = ({ value, min, max }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current && value !== undefined) {
      const svg = d3.select(ref.current);

      // 기존 내용을 지우고 새로운 그래프를 그릴 수 있도록 준비합니다.
      svg.selectAll('*').remove();

      const rate = value;
      const width = ref.current.clientWidth;
      const start = (8 / 21) * width; // 8% 위치
      const end = (12 / 21) * width; // 12% 위치
      const barWidth = end - start;

      const gradient = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('x2', '100%')
        .attr('y1', '0%')
        .attr('y2', '0%');

      gradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#59BFBE');

      gradient
        .append('stop')
        .attr('offset', '48.73%')
        .attr('stop-color', '#5BC569');

      gradient
        .append('stop')
        .attr('offset', '99.99%')
        .attr('stop-color', '#5DC93E');

      svg
        .append('rect')
        .attr('x', 0)
        .attr('y', 12)
        .attr('width', `100%`)
        .attr('height', '12px')
        .attr('fill', '#EEF9F5')
        .attr('rx', '8px')
        .attr('ry', '8px');

      svg
        .append('rect')
        .attr('x', start)
        .attr('y', 12)
        .attr('height', '12px')
        .attr('fill', 'url(#gradient)')
        .attr('rx', start === 0 ? '8px' : '0') // 시작 부분이 아닌 경우 둥근 모서리를 제거
        .attr('ry', start === 0 ? '8px' : '0')
        .attr('width', 0)
        .transition()
        .duration(1500)
        .attr('width', barWidth);

      // 양 끝에 구분선 추가
      svg
        .append('line')
        .attr('x1', start)
        .attr('y1', -50) // 막대 위로 5px
        .attr('x2', start)
        .attr('y2', 50) // 막대 아래로 5px
        .attr('stroke', '#BFBFBF')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 2'); // 점선

      svg
        .append('line')
        .attr('x1', end)
        .attr('y1', -50) // 막대 위로 5px
        .attr('x2', end)
        .attr('y2', 50) // 막대 아래로 5px
        .attr('stroke', '#BFBFBF')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 2'); // 점선
    }
  }, [value]);

  return (
    <Wrapper>
      {/* <div className="percent">{value}% </div> */}
      <Svg ref={ref} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > .percent {
    color: #000;
    font-family: SUIT;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    &::after {
      content: '/ 100%';
      color: var(--Gray3, #d9d9d9);
      font-family: SUIT;
      font-size: 10px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
`;

const Svg = styled.svg`
  width: 100%;
  height: 40px;
`;

export default TransverseGraph;
