import React, {PureComponent} from 'react';
import {FlatList, Image, View} from 'react-native';

const ImageItem = (props) => {
    return (
        <View style={{padding: 5}}>
            <Image
                style={{height: 104, width: 185}} 
                resizeMode={'contain'} 
                source={{uri: `https://image.tmdb.org/t/p/w185${props.image}`}}
                />    
        </View>
    )
}

export const ImageGallery = ({images, showMore}) => (  
    <FlatList
      data={images}
      keyExtractor={(item, index) => `img_${index}`}
      horizontal
      renderItem={({item}) => (
        <ImageItem image={item.file_path} ratio={item.ratio} width={item.width}/>
      )}
    />
);
