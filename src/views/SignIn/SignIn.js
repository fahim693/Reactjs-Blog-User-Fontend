import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  CircularProgress 
} from '@material-ui/core';
import { BackDrop } from 'elements';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'không để trống!' },
    email: {
      is: true,
      message: "không đúng!",
    },
    length: {
      maximum: 64,
      message: "tối đa 64 ký tự!",
    }
  },
  password: {
    presence: { allowEmpty: false, message: '^Mật khẩu không để trống!' },
    length: {
      maximum: 128,
      message: "^Mật khẩu tối đa 128 ký tự!"
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setOpenBackdrop(true);
      // THOI GIAN XU LY API O DAY!
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        // vi du ve chuyen huong qua trang quen mat khau sau khi call api
        history.push('/dashboard');
        setOpenBackdrop(false);
      }, 2000);
    }    
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Tự hào kết nối trí tuệ Việt.
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Lê Đình Hiệu
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Quản trị trang Website
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Đăng nhập
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Đăng nhập với địa chỉ email
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Địa chỉ email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Mật khẩu"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid||loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />} Đăng nhập ngay
                </Button>
                <Grid container
                    direction="row"
                    justify="space-between"
                >
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Chưa có tài khoản?{' '}
                      <Link
                        component={RouterLink}
                        to="/sign-up"
                        variant="h6"
                      >
                        Đăng ký
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      <Link
                        component={RouterLink}
                        to="/forever-password"
                        variant="h6"
                      >
                        Quên mật khẩu?
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>

      <BackDrop open={openBackdrop} />
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
