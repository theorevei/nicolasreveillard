import React, { useState, useEffect } from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useSpring, animated } from 'react-spring'
import { Spring } from 'react-spring/renderprops'
import signature from '../images/signature.svg'

export default () => {
  // Make the arrowdown and the navbar disapear on scroll
  const [fadeIn, setFadeIn] = useSpring(() => ({ opacity: 1 }))
  const [navFade, setNavFade] = useSpring(() => ({ opacity: 0 }))

  useEffect(() => {
    var prevScrollpos = window.pageYOffset
    const navOnScroll = () => {
      if (window.scrollY > 100) {
        setFadeIn({ opacity: 0 })
      } else {
        setFadeIn({ opacity: 1 })
      }
      var currentScrollPos = window.pageYOffset
      if (prevScrollpos > currentScrollPos) {
        setNavFade({ opacity: 1 })
      } else {
        setNavFade({ opacity: 0 })
      }
      prevScrollpos = currentScrollPos

      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >
        document.documentElement.offsetHeight - 1
      if (bottomOfWindow) {
        if (screen.width > 1024) setNavFade({ opacity: 1 })
      }
    }

    window.addEventListener('scroll', navOnScroll)
  })

  const data = useStaticQuery(graphql`
    query HeroQuery {
      allContentfulBandeau {
        edges {
          node {
            asset1 {
              fluid(resizingBehavior: SCALE) {
                ...GatsbyContentfulFluid_tracedSVG
                aspectRatio
              }
              title
            }
            asset2 {
              fluid(resizingBehavior: SCALE) {
                ...GatsbyContentfulFluid_tracedSVG
                aspectRatio
              }
              title
            }
            citation
            titreDuSite
          }
        }
      }
    }
  `)
  const [edges] = data.allContentfulBandeau.edges

  return (
    <div>
      <section className="hero is-fullheight header isSection">
        <div className="hero-head">
          <div className="columns is-gapless is-desktop" id="top">
            <div className="column">
              <Spring
                config={{ duration: 3000 }}
                to={{ opacity: 0.8 }}
                from={{ opacity: 0 }}
              >
                {fadeIn => (
                  <div style={fadeIn}>
                    <Img
                      className="bandeau1"
                      fluid={edges.node.asset1.fluid}
                      alt={edges.node.asset1.title}
                    />
                  </div>
                )}
              </Spring>
            </div>
            <h1 className="title title-brand is-info">
              {edges.node.titreDuSite}
            </h1>
            <div className="column">
              <Spring
                config={{ duration: 4000 }}
                to={{ opacity: 0.8 }}
                from={{ opacity: 0 }}
              >
                {fadeIn => (
                  <div style={fadeIn}>
                    <Img
                      fluid={edges.node.asset2.fluid}
                      style={{ opacity: '0.8' }}
                      alt={edges.node.asset2.title}
                    />
                  </div>
                )}
              </Spring>
            </div>
          </div>
        </div>
        <div className="hero-body is-block has-text-centered is-paddingless">
          <Spring
            config={{ duration: 4000 }}
            to={{ opacity: 0.8 }}
            from={{ opacity: 0 }}
          >
            {fadeIn => (
              <div style={fadeIn}>
                <blockquote>
                  <h1 className="title has-text-white quote">
                    {edges.node.citation}
                  </h1>
                </blockquote>
              </div>
            )}
          </Spring>
          <Spring
            config={{ duration: 4000 }}
            to={{ opacity: 0.8 }}
            from={{ opacity: 0 }}
          >
            {fadeIn => (
              <div className="is-pulled-right" style={fadeIn}>
                <img
                  alt="signature"
                  src={signature}
                  style={{
                    width: '340px',
                    height: 'auto',
                    opacity: '0.8',
                    paddingRight: '10px',
                  }}
                />
              </div>
            )}
          </Spring>
        </div>
        <animated.div style={fadeIn}>
          <div className="hero-footer has-text-centered ">
            <i className="fas fa-angle-down fa-2x"></i>
          </div>
        </animated.div>
      </section>
      <nav
        className="navbar is-info is-fixed-bottom "
        role="navigation"
        aria-label="main navigation"
        id="navbar"
      >
        <div className="navbar-brand">
          <animated.div style={navFade}>
            <a
              className="navbar-item has-text-weight-bold"
              id="brand"
              href="#top"
            >
              Nicolas Réveillard
            </a>
          </animated.div>
        </div>
      </nav>
    </div>
  )
}
