import { Flex, Text } from "@chakra-ui/react";

import './style.css';

export const Header = () => {


    window.addEventListener('scroll', ()=>{
        let scrollNumber = window.scrollY;
        let header = document.querySelector('.header');

        if(scrollNumber > 10){
            header?.classList.add('headerBlack');
        }
        else{
            header?.classList.remove('headerBlack');
            header?.classList.add('nada');
        }

    })


    return (
        <div>
            <Flex className="header" w='100%' h='70px' zIndex='99999' pos={'fixed'}>
                <Text as='b' fontSize={'4xl'} ml='50px' mt='5px' textColor={'red.500'}>CloneNetflix</Text>

            </Flex>
        </div>
    )
}