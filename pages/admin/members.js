"use strict"

import React, { useEffect, useState } from "react";
import Dashboard from "../../shared/layouts/Dashboard/Dashboard";
import Typography from "@mui/material/Typography";
import { TableMember } from "../../shared/components/table_member/tablemember";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

//data
import { URLAPI } from '../../config/urlapi'
import axios from "axios"


const Members = () => {
  const [playerData, setPlayerData] = useState([])
  const [loading, setLoading] = useState(false)

  function createPlayer({
    id = 0,
    name = "",
    job = "",
    mainJob = false,
    patk = 0,
    matk = 0,
    pdef = 0,
    mdef = 0
  }
  ) {
    return {
      id,
      name,
      job,
      mainJob,
      patk,
      matk,
      pdef,
      mdef,
    };
  }

  async function getData() {
    try {
      let response = await axios.get(`${URLAPI}/player`);

      let rows = response.data
        .filter(({ isMain }) => isMain === 1)
        .map(({ id, name, job, patk, matk, pdef, mdef }) => createPlayer(
          {
            id: id,
            name: name,
            job: job,
            patk: patk,
            matk: matk,
            pdef: pdef,
            mdef: mdef
          }))


      setPlayerData(rows)

      setLoading(true)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])


  return <MembersContainer data={playerData} loading={loading} />;
};

const MembersContainer = (props) => {
  const { data, loading } = props
  return (
    <Dashboard>
      <Typography variant="h4" className="cmb-3">
        Miembros del Gremio
      </Typography>
      <IconButton aria-label="edit" color="info" href="/admin/addmember">
        <Add />
      </IconButton>
      {loading && <TableMember rows={data} />}
    </Dashboard>
  );
};

export default Members;
