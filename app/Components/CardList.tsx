
import TitleControl from './TitleControl'
import CardCarousel from './CardCarousel'

import Card from './Card'

interface Props {
  endpoint: string
  nextEl: string,
  prevEl: string,
  title: string
}

const CardList:React.FC<Props> = async ({ endpoint, prevEl, nextEl, title}) => {
  const response = await fetch(endpoint, {method: 'GET'})
  const result = await response.json()
  const animes = result.data
  

  return (
    <div className='featured-section py-8 px-6 tablet:px-8 tablet:py-16 desktop:px-16'>
        <TitleControl title={title} nextEl={nextEl} prevEl={prevEl}/>
        <CardCarousel nextEl={nextEl} prevEl={prevEl} >
          {
            animes.map((anime:any) => 
              
              <Card 
                key={anime.mal_id}
                imageUrl={anime.images.jpg.image_url}
                animeTitleEnglish={!anime.title_english ? anime.title : anime.title_english}
                animeTitleJapanese={anime.title_japanese}
                animeType={anime.type != "TV" ? "TV" : anime.type}
                animeStatus={anime.status}
                animeRating={anime.rating}
                animeYear={anime.aired.prop.from.year}
              />
            )
          }
          
        </CardCarousel>
       
    </div>
  )
}

export default CardList