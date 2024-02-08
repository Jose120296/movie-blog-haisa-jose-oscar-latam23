import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import "../../styles/demo.css";

export const Demo = () => {

	return (
		<div className="profile-page sidebar-collapse">
		
        
			<div className="page-header header-filter" data-parallax="true" ></div>
				<div className="main main-raised">
				<div className="profile-content">
					<div className="container">
						<div className="row">
							<div className="col-md-6 ml-auto mr-auto">
								<div className="profile">
									<div className="avatar">
										<img src="https://upload.wikimedia.org/wikipedia/commons/5/59/Mindo_Ecuador_1093.jpg" alt="Circle Image" className="img-raised rounded-circle img-fluid"/>
									</div>
									<div className="name">
										<h3 className="title">username</h3>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="description text-center">
						<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima iusto repellendus, vero ullam laborum beatae placeat eveniet dolore repellat animi, odio consequuntur molestiae blanditiis deserunt sit nostrum quibusdam accusantium facilis. </p>
					</div>
					<div className="container d-flex justify-content-center">
						
							<div className="profile-tabs">
								<ul className="nav nav-pills nav-pills-icons justify-content-center" role="tablist">
									<li className="nav-item">
										<a className="nav-link" href="#studio" role="tab" data-toggle="tab">
											<i className="material-icons">movie</i> Visto
										</a>env run start
										
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#favorite" role="tab" data-toggle="tab">
											<i className="material-icons">favorite</i> Favorite
										</a>
									</li>
								</ul>
							</div>
						
					</div>
				</div>
			</div>

		</div>
	);
};
