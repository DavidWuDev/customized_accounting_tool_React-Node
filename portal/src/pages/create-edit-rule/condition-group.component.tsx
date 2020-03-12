import { View } from '@app/components';
import { Button } from '@material-ui/core';
import React from 'react';
import ConditionRow from './condition-row.component';
import { IGroupValue } from './condition-rule.types';

interface IProps {
  group: IGroupValue;
  onChange: (value: IGroupValue) => void;
  onUngroup?: (index: number) => void;
  root?: boolean;
}

const ConditionGroup: React.FC<IProps> = (props) => {
  const { group } = props;

  const handleGroup = (index: number) => {
    let existingGroupIndex = -1;

    if (index > 0 && (props.group.conditions[index - 1] as IGroupValue).conditions) {
      existingGroupIndex = index - 1;
    } else {
      if (props.group.conditions.length > (index + 1)) {
        if ((props.group.conditions[index + 1] as IGroupValue).conditions) {
          existingGroupIndex = index + 1;
        }
      }
    }

    const group = props.group;

    if (existingGroupIndex !== -1) {
      const condition = group.conditions.splice(index, 1)[0];
      (group.conditions[existingGroupIndex] as IGroupValue).conditions.push(condition as any);
    } else {
      group.conditions[index] = {
        type: '_$and',
        conditions: [group.conditions[index]],
      } as IGroupValue;
    }

    props.onChange({
      ...group,
    });
  };

  const handleUngroup = (index: number, childIndex: number) => {
    if ((group.conditions[index] as IGroupValue).conditions.length === 1) {
      group.conditions[index] = (group.conditions[index] as IGroupValue).conditions[0];
    } else {
      const condition = (group.conditions[index] as IGroupValue).conditions.splice(childIndex, 1)[0];
      group.conditions.splice(index, 0, condition as any);
    }

    props.onChange({
      ...group,
    });
  };

  const handleChange = (index, value) => {
    group.conditions[index] = value;
    props.onChange({
      ...group,
    });
  };

  const toggleGroupType = () => {
    props.onChange({
      ...group,
      type: group.type === '_$and' ? '_$or' : '_$and',
    });
  };

  const handleRemove = (index: number) => {
    props.onChange({
      ...group,
      conditions: (group.conditions as any[]).filter((c: any, i) => i !== index),
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) {
      return;
    }

    const temp = group.conditions[index - 1];
    group.conditions[index - 1] = group.conditions[index];
    group.conditions[index] = temp;

    props.onChange({
      ...group,
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= group.conditions.length - 1) {
      return;
    }

    const temp = group.conditions[index + 1];
    group.conditions[index + 1] = group.conditions[index];
    group.conditions[index] = temp;

    props.onChange({
      ...group,
    });
  };

  return (
    <View flexDirection="row">
      {!props.root && (
        <Button variant="contained" color="primary" onClick={toggleGroupType} style={{ backgroundColor: group.type === '_$and' ? 'rgba(50, 200, 150, 1)' : 'rgba(160, 120, 0, 1)', marginRight: 8 }}>
          {group.type === '_$and' ? 'AND' : 'OR'}
        </Button>
      )}
      <View>
        {(group.conditions as any[]).map((condition, index) => {
          const logicalGroup = condition as IGroupValue;

          if (logicalGroup.conditions) {
            return (
              <ConditionGroup
                key={index}
                group={logicalGroup}
                onChange={(value) => handleChange(index, value)}
                onUngroup={(childIndex) => handleUngroup(index, childIndex)}
              />
            );
          }

          return (
            <ConditionRow
              key={index}
              index={index}
              condition={condition}
              onChange={(value) => handleChange(index, value)}
              onRemove={() => handleRemove(index)}
              showRemove={false}
              error={false}
              onGroup={() => handleGroup(index)}
              onUngroup={() => props.onUngroup && props.onUngroup(index)}
              onMoveDown={() => handleMoveDown(index)}
              onMoveUp={() => handleMoveUp(index)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default ConditionGroup;