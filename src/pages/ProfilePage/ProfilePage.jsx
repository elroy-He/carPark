

import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
//import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostGallery from "../../components/PostSection/PostSection";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";

import { useParams } from "react-router-dom";

export default function ProfilePage() {
  return (
    <>
      <h1> This is profile page </h1>
    </>
  )
}