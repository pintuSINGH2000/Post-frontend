import React from "react";
import styles from "./navbar.module.css";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiGeminiFill } from "react-icons/ri";
import { HiLightBulb } from "react-icons/hi";
import { MdViewCarousel } from "react-icons/md";
import { LuFiles } from "react-icons/lu";
import { MdTrendingUp } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { BiSolidCalendarAlt } from "react-icons/bi";
import { GiSettingsKnobs } from "react-icons/gi";
import { BiSolidInfoCircle } from "react-icons/bi";
import { FaCircleRadiation } from "react-icons/fa6";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Progress } from 'antd';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navListTop}>
        <button className={styles.postBtn}>
          <FaEdit className={styles.edit} /> Write Post
        </button>
          <Link className={styles.navListItem}>
            <RiGeminiFill className={styles.navIcon} /> Post Generator
          </Link>
          <Link className={styles.navListItem}>
            <HiLightBulb className={styles.navIcon} /> Ideas Generator
          </Link>
          <Link className={styles.navListItem}>
            <MdViewCarousel className={styles.navIcon} /> Carousel Maker
          </Link>
          <Link className={styles.navListItem}>
            <LuFiles className={styles.navIcon} /> Posts
          </Link>
          <Link className={styles.navListItem}>
            <MdTrendingUp className={styles.navIcon} /> Content Inspiration
          </Link>
          <Link className={styles.navListItem}>
            <FaIdCard className={styles.navIcon} /> Posts for You
          </Link>
          <Link className={styles.navListItem}>
            <BiSolidCalendarAlt className={styles.navIcon} /> Schedule
          </Link>
      </div>
      <div className={styles.navListBottom}>
          <Link className={styles.navListItem}>
            <GiSettingsKnobs className={styles.navIcon} /> Preferences
          </Link>
          <Link className={styles.navListItem}>
            <FaCircleRadiation  className={styles.navIcon} /> Feature Request
          </Link>
          <div className={styles.planCard}>
            <div className={styles.planCardTop}>
               <div style={{display:"flex",gap:"10px"}}>Word Generated <BiSolidInfoCircle className={styles.navIcon} style={{color:"gray"}}/></div>
               <div>25k / 50k</div>
            </div>
            <Progress percent={50} showInfo={false} />
            <div style={{color:"gray",fontFamily:"sans-serif",padding:"10px 0px"}}>Monthly usage resets in 29 days</div>
            <button className={styles.upgradeBtn}><BsFillLightningChargeFill style={{fontSize:"16px"}} />Upgrade Plan</button>
          </div>
        </div>
    </div>
  );
};

export default Navbar;
