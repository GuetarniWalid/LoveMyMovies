import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap/gsap-core';
import config from '../../../config';
import styles from './Slider.module.css';
import { useHistory } from 'react-router-dom';

const movieSelected = ['witcher', 'irishman'];

export default function Slider() {
  const [poster, setPoster] = useState({ movieSelected: movieSelected[0], index: 0 });
  const [details, setDetails] = useState({
    title: '',
    resume: '',
    creators: [],
    genres: [],
    actors: [],
    video: '',
    chief: '',
    mediaType: '',
    id: '',
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [watchtrailer, setWatchtrailer] = useState(false);
  const [watchButtonActive, setwatchButtonActive] = useState(true);
  const session_id = useSelector(state => state.login.session_id);
  const animation = useRef(null);
  const animationDot = useRef(null);
  const animationBodyBackground = useRef(null);
  const heart = useRef(null);
  const hystory = useHistory();

  const animePoster = useCallback(() => {
    const index = poster.index === movieSelected.length - 1 ? 0 : poster.index + 1;
    setPoster({ movieSelected: movieSelected[index], index });
    if (!index) {
      gsap.to(`.${styles.animDot}`, { duration: 0.5, left: '5px' });
    } else {
      animationDot.current.restart();
    }
    animation.current.reverse();
    setWatchtrailer(false);
  }, [poster]);

  useEffect(() => {
    const posterDom = document.querySelector(`.${styles.poster}`);
    document.body.style.background = `url(/img/${poster.movieSelected}.jpg)`;
    document.body.style.backgroundSize = 'cover';
    posterDom.style.backgroundImage = `linear-gradient(to right, rgba(134, 134, 134, 0.1) 0%, rgba(75, 75, 75, 0.2) 100%),
      url(/img/${poster.movieSelected}.jpg)`;
  }, [poster]);

  useEffect(() => {
    const connexion = () => {
      if (!session_id) hystory.push('/');
      else {
        const fetchDetails = async () => {
          //get ID
          const dataId = await fetch(`${config.baseUrl}search/multi?api_key=${config.apiKey}&language=fr-FR&query=${poster.movieSelected}&page=1&include_adult=false`);
          const jsonId = await dataId.json();
          const id = jsonId.results[0].id;
          let mediaType = jsonId.results[0].media_type;

          //get details
          const dataDetails = await fetch(`${config.baseUrl}${mediaType}/${id}?api_key=${config.apiKey}&language=fr-FR`);
          const details = await dataDetails.json();

          //get actors
          const dataActors = await fetch(`${config.baseUrl}${mediaType}/${id}/credits?api_key=${config.apiKey}&language=fr-FR`);
          const jsonActors = await dataActors.json();
          const actors = jsonActors.cast;
          let directors;
          if (mediaType === 'movie') directors = jsonActors.crew;

          //get video
          const dataVideos = await fetch(`${config.baseUrl}${mediaType}/${id}/videos?api_key=${config.apiKey}&language=fr-FR`);
          const jsonVideos = await dataVideos.json();
          const videos = jsonVideos.results;
          const video =
            mediaType === 'tv'
              ? videos.find(video => {
                  const split = video.name.split(' ');
                  const langue = split[split.length - 1];
                  return langue === '[VF]';
                })
              : videos[1];

          //is Favorite ?
          const datafavorites = await fetch(`${config.baseUrl}account/{account_id}/favorite/${mediaType === 'tv' ? 'tv' : 'movies'}?api_key=${config.apiKey}&session_id=${session_id}&language=fr-FR`);
          const jsonFavorites = await datafavorites.json();
          const favorites = jsonFavorites.results.map(favorite => favorite.id);
          const isFavorite = favorites.includes(id);

          const detailsFormat = {
            title: mediaType === 'tv' ? details.name.toUpperCase() : details.title.toUpperCase(),
            resume: details.overview.split('.')[0] + '...',
            creators: mediaType === 'tv' ? details.created_by.map(creator => creator.name).slice(0, 5) : [...new Set(directors.map(director => director.name).slice(0, 5))],
            genres: details.genres.map(genre => genre.name).slice(0, 3),
            actors: actors.map(actor => actor.name).slice(0, 5),
            video: video.key,
            chief: mediaType === 'tv' ? 'Createur' : 'Directeur',
            mediaType,
            id,
          };
          setDetails(detailsFormat);
          setIsFavorite(isFavorite);
        };
        fetchDetails();
      }
    };
    connexion();
  }, [poster, session_id, hystory]);

  useEffect(() => {
    animation.current = gsap
      .timeline({ delay: 6 })
      .to(`.${styles.wrapperTitle} h1, .${styles.wrapperTitle} p`, { duration: 0.5, y: -20, opacity: 0 })
      .to(`.${styles.wrapperRight}, .${styles.page}`, { duration: 0.5, y: 20, opacity: 0 })
      .to(`.${styles.trailer}`, { duration: 0.8, width: 0 }, 0)
      .to(`.${styles.watch}`, { duration: 0.8, opacity: 0 }, 0.8)
      .to(`.${styles.play}`, { duration: 0.8, opacity: 0 }, 0)
      .to(`.${styles.like}`, { duration: 0.8, opacity: 0 }, 0)
      .to(`.${styles.poster}`, { duration: 1.5, width: 0 }, 0)
      .eventCallback('onStart', startAnim)
      .eventCallback('onComplete', animePoster)
      .eventCallback('onReverseComplete', () => setwatchButtonActive(true));
  }, [animePoster]);

  function startAnim() {
    setwatchButtonActive(false);
    animationBodyBackground.current.restart();
  }

  useEffect(() => {
    animationBodyBackground.current = gsap
      .timeline({ paused: true })
      .to(`.${styles.bodyBackgroundCover}`, { right: 0, left: 'unset' })
      .to(`.${styles.bodyBackgroundCover}`, { duration: 1.2, width: '100%' }, 0)
      .to(`.${styles.bodyBackgroundCover}`, { right: 'unset', left: 0 })
      .to(`.${styles.bodyBackgroundCover}`, { duration: 1.2, width: 0, ease: 'power1.in' });
  }, []);

  useEffect(() => {
    animationDot.current = gsap
      .timeline({ paused: true })
      .to(`.${styles.animDot}`, { duration: 0.3, width: '33px', ease: 'power2.out' })
      .to(`.${styles.animDot}`, { duration: 0.2, left: '+=21', ease: 'power2.in' }, 0.3)
      .to(`.${styles.animDot}`, { duration: 0.2, width: '12px', ease: 'power2.in' }, 0.3);
  }, []);

  function handleClickWatchTrailer() {
    animation.current.pause();
    setWatchtrailer(true);
  }

  async function handleLike() {
    let isSuccess;
    try {
      const datafavorites = await fetch(`${config.baseUrl}account/{account_id}/favorite?api_key=${config.apiKey}&session_id=${session_id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          media_type: details.mediaType,
          media_id: details.id,
          favorite: !isFavorite,
        }),
      });
      const jsonFavorites = await datafavorites.json();
      isSuccess = jsonFavorites.success;
    } catch (e) {
      console.log(e);
    }
    isSuccess && !isFavorite ? gsap.to(heart.current, { duration: 0.5, fill: 'white' }) : gsap.to(heart.current, { duration: 0.5, fill: 'transparent' });
    setIsFavorite(!isFavorite);
  }

  const active = {};
  if (!watchButtonActive && !watchtrailer) active.disabled = 'disabled';
  const creators = details.creators.map((creator, i) => <li key={i}>{creator}</li>);
  const actors = details.actors.map((actor, i) => <li key={i}>{actor}</li>);
  const genres = details.genres.map((genre, i) => <li key={i}>{genre}</li>);
  let dots = movieSelected.map((movie, index) => <span key={index} className={styles.dot} />);
  return (
    <div className={styles.wrapper}>
      {/* div poster to display background image and animate it */}
      <div className={styles.poster}></div>
      {/*****************/}
      <div className={styles.dotWrapper}>
        <div>
          <div className={styles.animDot}></div>
          {dots}
        </div>
      </div>
      <div className={styles.wrapperLeftAndRight}>
        <div className={styles.wrapperLeft}>
          <div className={styles.wrapperTitle}>
            <h1>{details.title}</h1>
            <p>{details.resume}</p>
            <div>
              <button className={styles.play} onClick={handleClickWatchTrailer}>
                LECTURE
              </button>
              <button className={styles.like} onClick={handleLike}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' width='30' className='heartWrapper'>
                  <path
                    ref={heart}
                    className={styles.heart}
                    fill={details.isFavorite ? 'white' : 'none'}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </button>
            </div>
            <div className={styles.wrapperTrailer}>
              <div className={styles.trailer}>
                {watchtrailer ? (
                  <iframe
                    title='extrait de The Witcher, la série'
                    width='370'
                    height='180'
                    src={`https://www.youtube.com/embed/${details.video}?autoplay=1&modestbranding=1&showinfo=0`}
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img src={`/img/${poster.movieSelected}_trailer.jpg`} alt='le héro avec une épée à la main' width='370' height='180' />
                )}
              </div>
              {watchtrailer ? (
                <button className={styles.watch + ' ' + styles.watchHiden} onClick={handleClickWatchTrailer} disabled>
                  BANDE ANNONCE
                </button>
              ) : (
                <button className={styles.watch} onClick={handleClickWatchTrailer} {...active}>
                  BANDE ANNONCE
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={styles.wrapperRight}>
          <div className={styles.wrapperDetails}>
            <div>
              <h3>{details.chief}</h3>
              <ul className={styles.creatorUl}>{creators}</ul>
            </div>
            <div>
              <h3 className={styles.stars}>Acteurs</h3>
              <ul>{actors}</ul>
            </div>
          </div>
          <ul className={styles.genres}>{genres}</ul>
        </div>
      </div>
      <span className={styles.page}>1/5</span>
    </div>
  );
}
