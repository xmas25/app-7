import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { load } from '~data/actions/bookmarks'

import Wrap from './wrap'
import Scroll from './scroll'
import Header from '../header'
import Items from '../items'
import Footer from '../footer'

function BookmarksContainer(props) {
    const { spaceId, search, ignore } = props
    const dispatch = useDispatch()
    const sort = useSelector(state=>state.config.raindrops_sort)

    useEffect(()=>{
        dispatch(load(spaceId, {
            search,
            sort,
            ignore
        }))
    }, [spaceId, search])

    return (
        <Wrap key={spaceId} {...props}>
            <Header {...props} />

            <Scroll {...props}>
                <Items {...props} />
                <Footer {...props} />
            </Scroll>
        </Wrap>
    )
}

BookmarksContainer.defaultProps = {
    spaceId:        0,
    activeId:       0,
    index:          0,
    compact:        false,
    compactLimit:   7,
    ignore:         0,  //ignore some collectionId when showing all bookmarks
    getLink:        undefined,
    events:         {}  //onBookmarkClick
}

export default BookmarksContainer