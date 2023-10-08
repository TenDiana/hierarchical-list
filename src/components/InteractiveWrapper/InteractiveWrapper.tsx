import React, {useEffect, useRef, useState} from 'react';
import Categories from "../Categories/Categories";
import './InteractiveWrapper.scss'
import DirectionBtns from "../DirectionBtns/DirectionBtns";
import Header from "../Header/Header";

interface Position {
    x: number;
    y: number;
}

const scaleItems: string[] = ['25', '30', '40', '50', '60', '70', '80', '90', '100', '125', '150'];

const InteractiveWrapper = () => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [startPosition, setStartPosition] = useState<Position | null>(null);
    const [scale, setScale] = useState<string>('100');
    const step: number = 15;
    const componentRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: any) => {
        setScale(item);
        setIsOpen(false);
    };

    const handleMove = (direction: string) => {
        let newX = position.x;
        let newY = position.y;

        switch (direction) {
            case 'up':
                newY -= step;
                break;
            case 'down':
                newY += step;
                break;
            case 'left':
                newX -= step;
                break;
            case 'right':
                newX += step;
                break;
            default:
                break;
        }

        setPosition({ x: newX, y: newY });
    };


    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging && startPosition) {
            const newX = e.clientX - startPosition.x;
            const newY = e.clientY - startPosition.y;
            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setStartPosition(null);
    };

    const increaseScale = () => {
        const currentIndex = scaleItems.indexOf(scale);
        if (currentIndex < scaleItems.length - 1) {
            setScale(scaleItems[currentIndex + 1]);
        }
    };

    const decreaseScale = () => {
        const currentIndex = scaleItems.indexOf(scale);
        if (currentIndex > 0) {
            setScale(scaleItems[currentIndex - 1]);
        }
    };
    const handleCenter = () => {
        if (componentRef.current) {
            // @ts-ignore
            const { width, height } = componentRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight - 200;
            const centerTop = (screenHeight - height) / 2;
            const centerLeft = (screenWidth - width) / 2;
            setPosition({ x: centerLeft, y: centerTop });
        }
    };
    useEffect(() => {
        handleCenter();
        window.addEventListener('resize', handleCenter);

        return () => {
            window.removeEventListener('resize', handleCenter);
        };
    }, []);
    return (
        <div className='wrapper'>
            <Header
                scale={scale}
                handleCenter={handleCenter}
                increaseScale={increaseScale}
                decreaseScale={decreaseScale}
                toggleDropdown={toggleDropdown}
                isOpen={isOpen}
                handleItemClick={handleItemClick}
            />
            <div className='wrapper__content'>
                <DirectionBtns handleMove={handleMove} />
                <div
                    className='wrapper__content-list'
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        cursor: isDragging ? 'grabbing' : 'grab',
                        scale: `${scale}%`
                    }}
                     onMouseDown={handleMouseDown}
                     onMouseMove={handleMouseMove}
                     onMouseUp={handleMouseUp}
                     ref={componentRef}
                >
                    <Categories/>
                </div>
            </div>

        </div>
    );
};

export default InteractiveWrapper;
