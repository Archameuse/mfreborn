import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { ReactNode, useEffect, useRef } from 'react'
import { Container, ContainerProps } from '@mantine/core'
import gsap from 'gsap'

const Home: NextPage = () => {
  let gsapRef = useRef<any>(null)
  let containerRef = useRef<any>(null)
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsapRef.current = gsap.timeline({paused: true})
        .to(containerRef.current.children[0], {
          filter: 'blur(0.2px)',
          scale: 1.01,
        })
        .to(containerRef.current.children[1], {
          top: 0,
          y: 0,
          opacity: 0,
        }, '<')
      
    })
    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <Layout title='idk' position='absolute'>
      <div className={styles.container} ref={containerRef}>
        <video src='/Video/mfforsite.mp4' onMouseEnter={() => gsapRef.current.play()} onMouseLeave={() => gsapRef.current.reverse()} className={styles.video} loop muted />
        <div className={styles.logo}>
          <Image src='/mflogobig.png' layout='fill' objectFit='contain' />
        </div>
      </div>
    </Layout>
  )
}

export default Home
