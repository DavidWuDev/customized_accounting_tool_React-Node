import { View } from '@app/components';
import { Card, CardContent, LinearProgress, Typography } from '@material-ui/core';
import React from 'react';

interface IProps {
  title: string;
  loading?: boolean;
}

const DashboadCard: React.FC<IProps> = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{props.title}</Typography>
      </CardContent>
      <div style={{ height: 300 }}>
        {props.loading ? (
          <View flexGrow alignItems="center" justifyContent="center" style={{ height: '100%' }}>
            <LinearProgress style={{ width: 100 }} />
          </View>
        ) : props.children}
      </div>
    </Card>
  );
};

export default DashboadCard;
