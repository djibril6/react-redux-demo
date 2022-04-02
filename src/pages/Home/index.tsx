import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useAxios from "axios-hooks";
import { useAppSelector } from "hooks";
import { EUserStatus, IUser } from "modules/types";
import React, { useCallback, useEffect } from "react";

function createData(name: string, email: string, status: boolean) {
  return {
    name,
    email,
    status: status ? EUserStatus.OPENED : EUserStatus.CLOSED,
  };
}

const rows = [
  createData("Frozen yoghurt", "159", true),
  createData("Ice cream sandwich", "159", true),
  createData("Eclair", "159", true),
  createData("Cupcake", "159", false),
  createData("Gingerbread", "159", true),
];

type UserListResult = {
  results: IUser[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

export const Home: React.FC = () => {
  const userData = useAppSelector((state) => state.users);

  const [
    { data: userList = {} as UserListResult, loading: loading },
    fetchUser,
  ] = useAxios<UserListResult>(
    {
      url: "/users",
      method: "GET",
    },
    {
      manual: true,
    }
  );

  const [
    { data: userUpdated = {} as IUser, loading: loadingUpdate },
    updateUser,
  ] = useAxios<IUser>(
    {
      method: "PATCH",
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const onUpdate = useCallback(
    (id: string, status: boolean) => () => {
      updateUser({
        url: `/users/${id}`,
        data: {
          status,
        },
      })
        .then((res) => {
          fetchUser();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [fetchUser, updateUser]
  );
  return (
    <Box padding={[0, 10]}>
      <Typography variant="h1" color="primary">
        Welcome back {userData.user.name}
      </Typography>

      {!loading && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Account status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.results?.map((user) => (
                <TableRow
                  key={user.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">
                    {user.status ? EUserStatus.OPENED : EUserStatus.CLOSED}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color={user.status ? "error" : "primary"}
                      size="small"
                      onClick={onUpdate(user.id, !user.status)}
                    >
                      {user.status ? "Close" : "Open"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
