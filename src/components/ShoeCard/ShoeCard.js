import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  let Component;
  let BadgeComponent;

  if (variant === 'on-sale') {
    Component = <SalePrice>{formatPrice(salePrice)}</SalePrice>
    BadgeComponent = <SaleBadge>Sale</SaleBadge>
  }

  if (variant === 'new-release') {
    BadgeComponent = <NewBadge>Just Released!</NewBadge>
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {BadgeComponent}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price sale={variant === 'on-sale' ? 'line-through' : 'none'}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {Component}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 344px;
`;

const Wrapper = styled.article`
  display: flex;
  height: 370px;
  flex-direction: column;
  margin-bottom: 32px;
  padding-right: 4px;
`;

const ImageWrapper = styled.div`
  position: relative;
  background-color: ${COLORS.gray[100]};
  border-radius: 16px 16px 4px 4px;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  margin-left: auto;
  text-decoration: ${p => p.sale};
  color: ${p => p.sale === 'line-through' ? COLORS.gray[700] : 'inherit'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  margin-left: auto;
`;

const SaleBadge = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  height: 32px;
  padding: 0 10px;
  color: ${COLORS.white};
  background-color: ${COLORS.primary};
  border-radius: 2px;
  font-size: ${(14/16)}rem;
  line-height: 1rem;
  font-weight: ${WEIGHTS.medium};
  display: flex;
  align-items: center;
`

const NewBadge = styled(SaleBadge)`
  background-color: ${COLORS.secondary};
`;

export default ShoeCard;
