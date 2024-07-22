import TitleControl from './TitleControl'
import CardCarousel from './CardCarousel'
import Link from 'next/link'
import { TopAnimeData, TopAnime } from '@/app/Types/TopAnime'
import { getTopAnimeData } from '@/app/Fetch'

import Card from './Card'

interface Props {
  
  endpoint: string
  nextEl: string,
  prevEl: string,
  title: string,
  type: string

}


const CardList:React.FC<Props> = async ({ endpoint, prevEl, nextEl, title, type}) => {
  const page1: TopAnime = await getTopAnimeData(endpoint, {page: 1})
  const page2: TopAnime = await getTopAnimeData(endpoint, {page: 2})
  const data: TopAnimeData[] = page1.data.concat(page2.data)

  return (
    <div className='featured-section py-8 px-6 tablet:px-8 tablet:py-16 desktop:px-16'>
        <TitleControl title={title} nextEl={nextEl} prevEl={prevEl}/>
        <CardCarousel nextEl={nextEl} prevEl={prevEl} >
          {
            data.map((anime: TopAnimeData) => 
              <Link key={anime?.mal_id} href={type + "/" + anime?.mal_id}>
                <Card 
                  imageUrl={anime?.images.jpg.large_image_url}
                  animeTitleEnglish={!anime?.title_english ? anime?.title : anime?.title_english}
                  animeTitleJapanese={anime?.title_japanese}
                  animeType={type == "manga" ? anime?.type : String(anime?.type).toLowerCase() == "tv special" ? "TV" : anime?.type}
                  animeStatus={anime?.status}
                  animeRating={anime?.rating}
               />
              </Link>
          
            )
          }  
        </CardCarousel>
    </div>
  )
}

export default CardList