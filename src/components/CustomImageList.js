import React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const CustomImageList = props => {
  const onImageClick = (event, image) => {
    props.onImageSelected(image);
  };

  return (
    <div>
      <ImageList
        sx={{
          border: '1px solid #ccc',
        }}
        cols={2}
        rowHeight={164}
      >
        {props.images.map((image) => (
          <ImageListItem
            key={image.preview}
            onClick={(event) => onImageClick(event, image)}
          >
            <img
              src={image.preview}
              alt={image.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default CustomImageList;
