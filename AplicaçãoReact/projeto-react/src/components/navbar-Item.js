import React from 'react'

function NavbarItem(prop) {

    return(

        <a onClick={prop.action}  href={prop.href}>
                <img src={prop.image} className={prop.classN}/>
                {prop.label}
              </a>
        

    )

}

export default NavbarItem