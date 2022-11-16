import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        const response = await signOutUser();
        setCurrentUser(null);

    };

    return (
        <Fragment>
            <div className='navigation'>
                <Link to="/" className='logo-container'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link to="/shop" className='nav-link'>
                        SHOP
                    </Link>
                    {
                        currentUser ?
                            (<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>)
                            :
                            (<Link to="/auth" className='nav-link'>
                                SIGN IN
                            </Link>)
                    }

                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;